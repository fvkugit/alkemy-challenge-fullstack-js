import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const URI = 'http://localhost:8000/api/transactions'
const URICats = 'http://localhost:8000/api/transactions/cats'

const ViewTransactions = () => {
    const [categoryFilter, setCategoryFilter] = useState(-1)
    const [categories, setCategories] = useState([])
    const[transactions, setTransactions] = useState([])
    const[showLimit, setShowLimit] = useState(10)
    useEffect(()=>{
        getTransactions()
        getCategories()
    },[])
    const getTransactions = async() => {
        const resp = await axios.get(URI)
        setTransactions((resp.data).reverse())
    }
    const deleteTransaction = async(bid) => {
        await axios.delete(`${URI}/${bid}`)
        getTransactions()
    }
    const getCurrentBalance = () => {
        let currentBalance = 0
        transactions.forEach((b) => {
            currentBalance = b.isIncome === true ? currentBalance += b.amount : currentBalance -= b.amount
        })
        return currentBalance
    }
    const getCategories = async() => {
        const res = await axios.get(URICats)
        setCategories(res.data)
    }
    const filterTransactions = (list) => {
        if (categoryFilter === -1){
            return list
        }else {return list.filter(x => x.categoryId === categoryFilter)}
    }

    return(
        <div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="jumbotron jumbotron-fluid mt-2">
                            <h1 className="display-4">Budget Management</h1>
                            <p className="lead">An easy way to take control of your personal finances.</p>
                            <h1 className="display-5">You current balance</h1>
                            <h1 className="display-5">${getCurrentBalance()}</h1>
                            <div className="d-grid gap-2 col-5 mx-auto">
                                <Link to={`/create/` } className="btn btn-outline-dark btn-lg mb-2"><i className="fa-solid fa-plus me-2"></i>Add new transaction</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="input-group">
                <label className="input-group-text">Filter by category: </label>
                <select className="form-select" id="categoryFilter" onChange={(e) => setCategoryFilter(parseInt(e.target.value))}>
                    <option key={-1} value={-1}>All</option>
                    {categories.map( cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>
            <table className="table table-dark">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Manage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterTransactions(transactions.slice(0, showLimit)).map( t => 
                                (
                                    <tr key={t.id}>
                                        {t.isIncome ? <th><i style={{color:"#90ee90"}} className="fa-solid fa-circle-up"></i></th>:<th><i style={{color:"#ee9090"}} className="fa-solid fa-circle-down"></i></th>}
                                        <th>{t.category.name}</th>
                                        <th>{t.desc}</th>
                                        <th>${t.amount}</th>
                                        <th>{new Date(t.createdAt).toLocaleDateString("es-ES", { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</th>
                                        <th>
                                            <Link to={`/edit/${t.id}` } className="btn btn-outline-light me-3"><i className="fa-solid fa-square-pen"></i></Link>
                                            <button onClick={()=>deleteTransaction(t.id)} className="btn btn-outline-light"><i className="fa-solid fa-square-minus"></i></button>
                                        </th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {transactions.length === 0 && <h1 className="fs-3 text-center">There aren't transactions in your history, start creating the first one.</h1>}
                        {transactions.length > showLimit && <div className="d-grid gap-4 col-3 mx-auto"><button onClick={()=>setShowLimit(showLimit+10)} className="btn btn-outline-dark btn-lg"><i className="fa-solid fa-spinner"></i> See more... </button></div>}
        </div>
    )

}

export default ViewTransactions