import {useDispatch} from 'react-redux';
import Head from 'next/head';
import ReactPaginate from 'react-paginate';
import "react-toastify/dist/ReactToastify.css";

import BackButton from "../components/common/BackButton";
import UserList from "../components/users/usersList";
import {withRedux} from "../lib/withRedux";
import {withAuth} from "../lib/withAuth";
import {fetchUsers} from "../redux/users/action";
import {useQuery} from "@redux-requests/react";
import {useCallback, useState} from "react";

const UsersPage = () => {
    const [selectedPage, setSelectedPage] = useState(1)
    const {data} = useQuery({type: fetchUsers, requestKey: selectedPage});
    const lastPage = data?.lastPage;
    const searchQuery = data?.searchQuery;
    const dispatch = useDispatch();

    const handleUserSearch = useCallback(async (search) => {
        await dispatch(fetchUsers(search.query))
        setSelectedPage(1)
    }, []);

    const handlePagination = useCallback(async (page) => {
        await dispatch(fetchUsers(searchQuery, page.selected + 1))
        setSelectedPage(page.selected + 1)
    }, []);

    const paginationComponent = lastPage > 1 && (
        <div className="d-inline-flex justify-content-center w-100">
            <ReactPaginate
                previousLabel={String.fromCharCode(171)}
                nextLabel={String.fromCharCode(187)}
                breakLabel={'...'}
                breakClassName={'page-link'}
                activeClassName={'active'}
                disabledClassName={'disabled'}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                initialPage={selectedPage - 1}
                pageCount={lastPage}
                disableInitialCallback={true}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePagination}
            />
        </div>
    )
    return (
        <>
            <Head>
                <title>Users</title>
            </Head>
            <div className="central-column">
                <div className="card-header central-column-header bg-transparent">
                    <BackButton/>
                    <div className="central-column-header-title">
                        <h3 className="mb-0">Users List</h3>
                    </div>
                </div>
                <div className="card-body">
                    <UserList
                        onSubmit={handleUserSearch}
                        selectedPage={selectedPage}
                    />
                </div>
                {paginationComponent}
            </div>
        </>
    )
}

export const getServerSideProps = withRedux(withAuth(
    async (ctx, dispatch) => {
        const {error} = await dispatch(fetchUsers());
        if (error?.response.status === 404) {
            return {
                notFound: true,
            }
        }
        return {
            props: {
                page: ctx.query
            }
        };
    }
))

export default UsersPage;