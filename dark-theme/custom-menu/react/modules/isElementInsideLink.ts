// This is a totally valid use case for any, eslint.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isHTMLElement(x: any): x is HTMLElement {
  return 'tagName' in x
}

function isLink(element: HTMLElement): element is HTMLAnchorElement {
  return String(element.tagName).toUpperCase() === 'A'
}

export function isElementInsideLink(
  node: HTMLElement | null,
  limit?: HTMLElement
): boolean {
  if (!node || !isHTMLElement(node)) {
    return false
  }

  if (isLink(node)) {
    return true
  }

  const { parentNode } = node

  if (
    !parentNode ||
    !isHTMLElement(parentNode) ||
    parentNode.tagName.toUpperCase() === 'BODY' ||
    (limit && parentNode === limit)
  ) {
    return false
  }

  return isElementInsideLink(parentNode, limit)
}
