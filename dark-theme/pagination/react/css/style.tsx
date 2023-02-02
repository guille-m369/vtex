export const estilo = `
.pagination {
    display: flex;
    padding: 0;
    justify-content: space-between;
    list-style: none;
    cursor: pointer;
  }
  
  .pagination a {
    padding: 17px 23px;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
    border: 1px solid #3D3D3D;
    margin: 0.3rem;
  }
  
  .pagination__link {
    font-weight: bold;
    border: none !important;
  }
  
  .pagination__link--active a {
    color: #fff;
    border: 1px solid #3D3D3D;
    background: #0F59D2;
  }
  
  .pagination__link--disabled a {
    color: rgb(198, 197, 202);
  
  }

  @media (max-width: 600px) {
    .pagination a {
      padding: 17px 15px;
    }
    .pagination {
        cursor: auto;
      }
  }
`;
