import { useLocation, useNavigate } from 'react-router-dom'
import { useAllPlacesContext } from '../../pages/AllMyPlacesPage'
import styled from 'styled-components'
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa'

function PageBtnContainer() {
  const {
    data: { numOfPages, currentPage },
  } = useAllPlacesContext()

  const { search, pathname } = useLocation()
  const navigate = useNavigate()
  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1)

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search)
    searchParams.set('page', pageNumber)
    navigate(`${pathname}?${searchParams.toString()}`)
  }

  //   complex
  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        className={`btn page-btn ${activeClass ? 'active' : ''}`}
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    )
  }

  const renderPageButtons = () => {
    const pageButtons = []

    //     add first page button
    pageButtons.push(addPageButton({ pageNumber: 1, activeClass: currentPage === 1 }))
    //     add dots if there are more than 3 pages
    if (currentPage > 3) {
      pageButtons.push(
        <span className='page-btn dots' key={'dots-1'}>
          ....
        </span>
      )
    }
    //     one before current page
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(addPageButton({ pageNumber: currentPage - 1, activeClass: false }))
    }
    //     add current page button
    if (currentPage !== 1 && currentPage !== numOfPages) {
      pageButtons.push(addPageButton({ pageNumber: currentPage, activeClass: true }))
    }
    //     one after current page
    if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
      pageButtons.push(addPageButton({ pageNumber: currentPage + 1, activeClass: false }))
    }
    if (currentPage < numOfPages - 2) {
      pageButtons.push(
        <span className='page-btn dots' key={'dots_1'}>
          ....
        </span>
      )
    }
    //     add last page button
    pageButtons.push(
      addPageButton({
        pageNumber: numOfPages,
        activeClass: currentPage === numOfPages,
      })
    )
    return pageButtons
  }

  return (
    <StyledWrapper>
      <div className='btn-container'>
        {/* PREV BUTTON */}
        <button
          className='btn prev-btn'
          onClick={() => {
            let prevPage = currentPage - 1
            if (prevPage < 1) prevPage = 1
            handlePageChange(prevPage)
          }}
        >
          <FaChevronCircleLeft />
          Prev
        </button>
        {/* PAGES NUM */}
        <div className='btn-container'>{renderPageButtons()}</div>
        {/* NEXT BUTTON */}
        <button
          className='btn next-btn'
          onClick={() => {
            let nextPage = currentPage + 1
            if (nextPage > numOfPages) nextPage = 1
            handlePageChange(nextPage)
          }}
        >
          next <FaChevronCircleRight />
        </button>
      </div>
    </StyledWrapper>
  )
}
export default PageBtnContainer

const StyledWrapper = styled.div`
  margin-top: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .btn-container {
    display: flex;
  }
  button {
    display: flex;
  }
  .prev-btn,
  .next-btn {
    margin: 0 20px;
    display: flex;
    gap: 10px;
  }
  .active {
    background-color: var(--primary-800);
  }
`
