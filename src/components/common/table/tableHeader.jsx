import React from 'react'
import PropTypes from 'prop-types'
import ArrowDown from '../../ui/icons/arrowDown'
import ArrowUp from '../../ui/icons/arrowUp'

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === 'asc' ? 'desc' : 'asc'
            })
        } else {
            onSort({ path: item, order: 'asc' })
        }
    }
    const checkOrder = () => {
        if (selectedSort.order === 'asc') {
            return <ArrowDown />
        } else if (selectedSort.order === 'desc') {
            return <ArrowUp />
        }
        return undefined
    }
    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column].path)
                                : undefined
                        } //условное добавление сортировки(т.к. к качеству мы не добавляли path в columns)
                        {...{ role: columns[column].path && 'button' }}
                        scope="col"
                    >
                        {columns[column].name}
                        {columns[column].path === selectedSort.path
                            ? checkOrder()
                            : undefined}
                    </th>
                ))}
            </tr>
        </thead>
    )
}
TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
}
export default TableHeader
