function Home({users}) {
    return (
        <div className="container">
            <main>
                <h1 className="title">
                    Users List
                </h1>
                {users && (
                    <table cellspacing="2" border="1" cellpadding="5">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <th>
                                    {user.id}
                                </th>
                                <td>
                                    {user.name}
                                </td>
                                <td className="table-item-name">
                                    {user.email}
                                </td>
                                <td>
                                    {user.phone}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </main>
        </div>
    )
}

export async function getStaticProps() {
    const res = await fetch(`http://127.0.0.1:8000/api/users`)
    const users = await res.json()

    return {props: {users}}
}

export default Home
