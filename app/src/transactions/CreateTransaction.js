import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const URI = 'http://localhost:8000/api/transactions'
const URICats = 'http://localhost:8000/api/transactions/cats'

const CreateTransaction = () => {
    const [categories, setCategories] = useState([])
    useEffect(()=>{
        getCategories()
    },[])
    const[categoryId, setCategory] = useState(8)
    const[amount, setAmount] = useState('')
    const[desc, setDesc] = useState('')
    const[isIncome, setIncome] = useState(false)
    const navigate = useNavigate()

    const getCategories = async() => {
        const resp = await axios.get(URICats)
        setCategories(resp.data)
    }

    const store = async(e) => {
        e.preventDefault()
        axios.post(URI, {categoryId, amount, desc, isIncome})
        navigate('/')
    }

    return(
        <div>
            <div className="container">
            <div className="jumbotron jumbotron-fluid mt-2">
                <h1 className="display-4">Budget Management</h1>
                <p className="lead">An easy way to take control of your personal finances.</p>
            </div>
                <form className="row gy-1 gx-5 align-items-center" onSubmit={store}>
                    <div className="input-group mb-3">
                        <label className="input-group-text">Select category: </label>
                        <select className="form-select" onChange={(e) => (setCategory(e.target.value))} id="category" value={categoryId}>
                            {categories.map( cat => (
                                <option selected key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="amount">Amount: $</span>
                        <input type="text" className="form-control" onChange={(e) => (setAmount(e.target.value))} placeholder="0.0"/>
                    </div>
                    <div className="input-group">
                        <span className="input-group-text">Description</span>
                        <textarea className="form-control" onChange={(e) => (setDesc(e.target.value))}></textarea>
                    </div>
                    <div className="row gy-1 align-items-center">
                        <div className="form-check form-switch ms-5">
                            <input style={{transform: "scale(1.8)"}} className="form-check-input" onChange={(e) => (setIncome(e.target.checked))} type="checkbox" role="switch" id="incomeSwitch" defaultChecked={false}/>
                            <label className="form-check-label">{}</label>
                        </div>
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

export default CreateTransaction