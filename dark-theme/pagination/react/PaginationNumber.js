import { useState, useRef, useCallback, useEffect } from 'react'
import ReactPaginate from "react-paginate";
import { useRuntime } from 'vtex.render-runtime'
import {
  useSearchPageStateDispatch,
  useSearchPageState,
} from 'vtex.search-page-context/SearchPageContext'
import useSearchState from './hooks//useSearchState'
import { useSearchPage } from 'vtex.search-page-context/SearchPageContext'

import Style from 'style-it';
import { path } from 'ramda'
import { estilo } from "./css/style";
import { useDevice } from "vtex.device-detector";
import { Spinner } from 'vtex.styleguide';

export const FETCH_TYPE = {
  NEXT: 'next',
  PREVIOUS: 'previous',
}


const handleFetchMore = async (
  from,
  to,
  direction,
  fetchMoreLocked,
  setLoading,
  fetchMore,
  products,
  updateQueryError,
  fuzzy,
  operator,
  searchState
) => {
  if (fetchMoreLocked.current || products.length === 0) {
    return
  }


  const isForward = direction === FETCH_TYPE.NEXT

  fetchMoreLocked.current = true

  setLoading(true)

  return fetchMore({
    variables: {
      from,
      to,
      fuzzy,
      operator,
      searchState,
    },
    updateQuery: (prevResult, { fetchMoreResult }) => {
      setLoading(false)
      fetchMoreLocked.current = false

      if (!products || !fetchMoreResult) {
        updateQueryError.current = true
        return
      }

      // backwards compatibility
      if (prevResult && prevResult.search) {
        return {
          search: {
            ...prevResult.search,
            products: isForward
              ? [
                ...prevResult.search.products
              ]
              : [
                ...prevResult.search.products,
              ],
          },
        }
      }

      return {
        ...fetchMoreResult,
        productSearch: {
          ...fetchMoreResult.productSearch,
          products: isForward
            ? [...fetchMoreResult.productSearch.products]
            : [...fetchMoreResult.productSearch.products],
        },
      }
    },
  }).catch(error => {
    setLoading(false)
    fetchMoreLocked.current = false
    updateQueryError.current = true
    return { error: error }
  })
}

const useFetchingMore = () => {
  const [loading, localSetMore] = useState(false)
  const { isFetchingMore } = useSearchPageState()
  const dispatch = useSearchPageStateDispatch()
  const setFetchMore = useCallback(
    value => {
      dispatch({ type: 'SET_FETCHING_MORE', args: { isFetchingMore: value } })
      localSetMore(value)
    },
    [dispatch]
  )
  const stateValue = isFetchingMore == null ? loading : isFetchingMore
  return [stateValue, setFetchMore]
}

const PaginationNumber = props => {
  const {
    nextLabel,
    previousLabel,
    nextLabelMobile,
    previousLabelMobile,
    srcLoadingImage
  } = props

  const { isMobile } = useDevice();

  const { searchQuery, maxItemsPerPage } = useSearchPage()
  const products = path(['data', 'productSearch', 'products'], searchQuery)
  const recordsFiltered = path(
    ['data', 'productSearch', 'recordsFiltered'],
    searchQuery
  )
  const fetchMore = path(['fetchMore'], searchQuery)

  const query = path(['variables', 'query'], searchQuery);
  const map = path(['variables', 'map'], searchQuery);
  const orderBy = path(['variables', 'orderBy'], searchQuery);
  const priceRange = path(['variables', 'priceRange'], searchQuery);

  const { setQuery, query: runtimeQuery } = useRuntime()
  const { fuzzy, operator, searchState } = useSearchState()

  const [pageA, setPageA] = useState((runtimeQuery.page && Number(runtimeQuery.page)) || 1)

  const [loading, setLoading] = useFetchingMore()
  const isFirstRender = useRef(true)
  const [numberPagination, setNumberPagination] = useState(0)
  const fetchMoreLocked = useRef(false) // prevents the user from sending two requests at once
  /* this is a temporary solution to deal with unexpected 
  errors when the search result uses infinite scroll. 
  This should be removed once infinite scrolling is removed */
  const updateQueryError = useRef(false) //TODO: refactor this ref

  useEffect(() => {

    isFirstRender.current = false

  }, [maxItemsPerPage, query, map, orderBy, priceRange])

  useEffect(() => {

    paginacion()
  })

  const handleFetchMoreNext = async (page) => {
    // console.log("pagina-----"+page)

    setQuery(
      {
        page: page,
      },
      { replace: true }
    )
    //console.log("Tooo"+ ( (page-1)* maxItemsPerPage) +" from" + (parseInt(page)* maxItemsPerPage-1))
    const promiseResult = await handleFetchMore(
      ((parseInt(page) - 1) * maxItemsPerPage),
      (parseInt(page) * maxItemsPerPage - 1),
      FETCH_TYPE.NEXT,
      fetchMoreLocked,
      setLoading,
      fetchMore,
      products,
      updateQueryError,
      fuzzy,
      operator,
      sessionStorage.getItem('searchState') ?? searchState
    )

  }


  function paginacion() {
    setNumberPagination(Math.ceil(recordsFiltered / maxItemsPerPage))
  }
  function handlePageClick({ selected: selectedPage }) {

    handleFetchMoreNext((selectedPage + 1))

    window.scrollTo(0, 0);

  }

  return Style.it(`
  ${estilo}
`,


    <div className="flex relative" style={loading ? { background: 'rgba(255, 255, 255, .6)' } : {}}>
      <ReactPaginate
        initialPage={pageA - 1}
        previousLabel={!isMobile ? (previousLabel ? previousLabel : "← Previous") : (previousLabelMobile ? previousLabelMobile : "←")}
        nextLabel={!isMobile ? (nextLabel ? nextLabel : "Next →") : (nextLabelMobile ? nextLabelMobile : "→")}
        pageCount={numberPagination}
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />

      {loading && (
        <div
          className="fixed w-100 h-100 z-2"
          style={{ background: 'rgba(255, 255, 255, .6)', top: '0', bottom: '0', left: '0', right: '0' }}
        >
          <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center pt11"
          >{
              srcLoadingImage ? <img src={srcLoadingImage} width={160} height={70} alt="loadingImage" /> :
                <Spinner />

            }</div>
        </div>
      )}


    </div>


  )
}

export default PaginationNumber