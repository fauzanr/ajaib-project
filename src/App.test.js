import { fireEvent, render, screen } from '@testing-library/react';
import UserTableFilter from './components/UserTableFilter';
import UserTable from './components/UserTable'
import { users } from './testData'

describe('First load', () => {
  test('Data on table', async () => {
    const { container } = render(<UserTable users={users} />)
    
    const userTable = container.querySelector('.ant-table')
    const userTableRows = await screen.findAllByRole('row')
    
    expect(userTable).toBeInTheDocument()
    expect(userTableRows.length).toBeGreaterThan(0)
  });
});

describe('Filter by gender', () => {
  const options = ['Male', 'Female']
  options.forEach(option => {
    test('Select ' + option, () => {
      const updateQuery = jest.fn()
      render(<UserTableFilter updateQuery={updateQuery}  />)
      
      const genderSelect = screen.getByLabelText('Gender');
      fireEvent.mouseDown(genderSelect)
      fireEvent.click(screen.getAllByText(option)[0])

      const query = updateQuery.mock.calls[0][0]
      expect(updateQuery).toHaveBeenCalled()
      expect(query.gender).toBe(option.toLowerCase())
    })
  })
})

describe('Search by keyword', () => {
  const keywords = ['Susan', 'Joko']
  keywords.forEach(keyword => {
    test('Search ' + keyword, () => {
      const updateQuery = jest.fn()
      const {container} = render(<UserTableFilter updateQuery={updateQuery} />)
      
      const keywordInput = screen.getByLabelText('Search');
      
      fireEvent.change(keywordInput, { target: { value: keyword } })
      fireEvent.click(container.querySelector('button.ant-input-search-button'))
  
      const query = updateQuery.mock.calls[0][0]
      expect(updateQuery).toHaveBeenCalled()
      expect(query.keyword).toBe(keyword)
    })
  })
})

describe('Pagination change', () => {
  test('Go to page 2', () => {
    const updateQuery = jest.fn()
    const { container } = render(<UserTable users={users} updateQuery={updateQuery} />)
    
    const paginationBtn = container.querySelector('.ant-pagination-item-2');
    fireEvent.click(paginationBtn)

    const query = updateQuery.mock.calls[0][0]
    expect(updateQuery).toHaveBeenCalled()
    expect(query.page).toBe(2)
    expect(paginationBtn.classList.contains('ant-pagination-item-active')).toBe(true)
  })
})

describe('Sort by column', () => {
  test('Sort email', () => {
    const updateQuery = jest.fn()
    render(<UserTable users={users} updateQuery={updateQuery} />)
    
    const tableHead = screen.getByText('Email')
    fireEvent.click(tableHead)
    
    const query = updateQuery.mock.calls[0][0]
    expect(updateQuery).toHaveBeenCalled()
    expect(query.sortBy).toBe('email')
  })
})