import React, { useState, useEffect } from 'react'
import { paginate } from '../../../utils/paginate'
import Pagination from '../../common/pagination'
import GroupList from '../../common/groupList'
import SearchStatus from '../../ui/searchStatus'
import UserTable from '../../ui/usersTable'
import _ from 'lodash'
import SearchForm from '../../common/form/searchForm'
import { useUser } from '../../../hooks/useUsers'
import { useAuth } from '../../../hooks/useAuth'
import {
    getProfessions,
    getProfessionsLoadingStatus
} from '../../../store/professions'
import { useSelector } from 'react-redux'

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1) //по умолчанию будет всегда отображаться 1 страница
    const [selectedProf, setSelectedProf] = useState()
    const [searchQuery, setSearchQuery] = useState('')
    const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
    const pageSize = 8 //по 4 user на каждой странице

    const { users } = useUser()
    const professions = useSelector(getProfessions())
    const professionsLoading = useSelector(getProfessionsLoadingStatus())
    const { currentUser } = useAuth()

    const handleDelete = (userId) => {
        // setUsers(users.filter((user) => user._id !== userId))
        console.log(userId)
    }
    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark }
            }
            return user
        })
        // setUsers(newArray);
        console.log(newArray)
    }

    useEffect(() => {
        //исправление ошибки пагинации
        setCurrentPage(1)
    }, [selectedProf, searchQuery])

    const handleProfessionSelect = (item) => {
        if (searchQuery !== '') setSearchQuery('')
        setSelectedProf(item)
    }
    const handleSearchQuery = ({ target }) => {
        setSelectedProf(undefined)
        setSearchQuery(target.value)
    }
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }
    const handleSort = (itemObj) => {
        setSortBy(itemObj)
    }

    if (users) {
        function filterUsers(data) {
            const filteredUsers = searchQuery
                ? data.filter(
                      (user) =>
                          user.name
                              .toLowerCase()
                              .indexOf(searchQuery.toLowerCase()) !== -1
                  )
                : selectedProf
                ? data.filter(
                      (user) =>
                          JSON.stringify(user.profession) ===
                          JSON.stringify(selectedProf)
                  )
                : data
            return filteredUsers.filter((u) => u._id !== currentUser._id)
        }
        const filteredUsers = filterUsers(users)
        const count = filteredUsers.length
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        )
        const userCrop = paginate(sortedUsers, currentPage, pageSize)
        const clearFilter = () => {
            setSelectedProf()
        }

        return (
            <div className="d-flex">
                {professions && !professionsLoading && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить фильтр
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <SearchForm
                        value={searchQuery}
                        onChange={handleSearchQuery}
                    />
                    {count > 0 && (
                        <UserTable
                            users={userCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        )
    }
    return 'Loading...'
}

export default UsersListPage
