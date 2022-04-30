import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const URI = 'http://localhost:8000/api/transactions/'
const URICats = 'http://localhost:8000/api/transactions/cats'

const EditTransaction = () => {
    const [categories, setCategories] = useState([])
    const[categoryId, setCategory] = useState('')
    const[amount, setAmount] = useState('')
    const[desc, setDesc] = useState('')
    const {id} = useParams()
    const navigate = useNavigate()

    const update = async(e) => {
        e.preventDefault()
        await axios.put(URI+id, {categoryId, amount, desc})
        navigate('/')
    }
    
    useEffect(()=>{
        getTransactionData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const getTransactionData = async () => {
        const res = await axios.get(URI+id)
        getCategories()
        setCategory(res.data.categoryId)
        setAmount(res.data.amount)
        setDesc(res.data.desc)
    }

    const getCategories = async() => {
        const res = await axios.get(URICats)
        setCategories(res.data)
    }

    return(
        <div>
            <div className="container">
            <div className="jumbotron jumbotron-fluid mt-2">
                <h1 className="display-4">Budget Management</h1>
                <p className="lead">An easy way to take control of your personal finances.</p>
            </div>
                <form className="row gy-1 gx-5 align-items-center" onSubmit={update}>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Select category: </label>
                        <select className="form-select" onChange={(e) => (setCategory(e.target.value))} id="category" value={categoryId} >
                            {categories.map( cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="amount">Amount: $</span>
                        <input type="text" className="form-control" value={amount} onChange={(e) => (setAmount(e.target.value))} placeholder="0.0" aria-describedby="basic-addon1"/>
                    </div>
                    <div className="input-group">
                        <span className="input-group-text">Description</span>
                        <textarea className="form-control" value={desc} onChange={(e) => (setDesc(e.target.value))} aria-label="With textarea"></textarea>
                    </div>
                    <div className="d-grid gap-2 mx-auto mt-5">
                        <button type="submit" className="btn btn-outline-success btn-lg mb-2"><i className="fa-solid fa-check me-2"></i>Done</button>
                        <Link to={`/` } className="btn btn-outline-danger btn-lg mb-2"><i className="fa-solid fa-xmark me-2"></i>Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default EditTransaction