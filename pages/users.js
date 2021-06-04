import {useDispatch, useSelector} from 'react-redux';
import Head from 'next/head';
import {toast} from "react-toastify";
import ReactPaginate from 'react-paginate';
import "react-toastify/dist/ReactToastify.css";

import BackButton from "../components/common/BackButton";
import UserList from "../components/users/usersList";
import {withRedux} from "../lib/withRedux";
import {withAuth} from "../lib/withAuth";
import {getUsersAsync} from "../redux/users/action";

const UsersPage = () => {
    const {currentPage, lastPage, searchQuery} = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const handleUserSearch = async (search) => {
        try {
            await dispatch(getUsersAsync(search.query));
        } catch (error) {
            toast.error(error.toString())
        }
    }
    const handlePagination = async (page) => {
        try {
            await dispatch(getUsersAsync(searchQuery, page.selected + 1));
        } catch (error) {
            toast.error(error.toString())
        }
    };
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
                initialPage={currentPage-1}
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
                <div className="card-header central-column-header">
                    <BackButton/>
                    <div className="central-column-header-title">
                        <h3 className="mb-0">Users List</h3>
                    </div>
                </div>
                <div className="card-body">
                    <UserList
                        onSubmit={handleUserSearch}
                    />
                </div>
                {paginationComponent}
            </div>
        </>
    )
}

export const getServerSideProps = withRedux(withAuth(async (ctx, dispatch) => {
    try {
        await dispatch(getUsersAsync());
        return {
            props: {
                page: ctx.query
            }
        };
    } catch (e) {
        if (e.response.status === 404) {
            return {
                notFound: true,
            }
        }
    }
}))

export default UsersPage;