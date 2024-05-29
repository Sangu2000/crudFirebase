import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import './Crud.css';
import { addDoc, collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const Crud = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fetchData, setFetchData] = useState([]);
    const [id, setId] = useState('');
    const dbRef = collection(db, 'fire');

    const add = async () => {
        try {
            await addDoc(dbRef, { Name: name, Email: email, Password: password });
            alert('Data added');

        } catch (error) {
            alert('error');
            console.log(error);
        }
    };

    const fetch = async () => {
        try {
            const snapshot = await getDocs(dbRef);
            const fetchdata = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setFetchData(fetchdata);
            console.log(fetchdata);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    const passData = (id) => {
        const matchId = fetchData.find((data) => data.id === id);
        if (matchId) {
            setName(matchId.Name);
            setEmail(matchId.Email);
            setPassword(matchId.Password);
            setId(matchId.id);
        } else {
            console.log('Document not found');
        }
    };

    const update = async () => {
        if (id) {
            const docRef = doc(db, 'fire', id);
            try {
                await updateDoc(docRef, { Name: name, Email: email, Password: password });
                alert('Data updated');

            } catch (error) {
                alert('Error occurred while updating data');
                console.error('Error updating document: ', error);
            }
        } else {
            alert('No document selected for update');
        }
    };


    const del = async (id) => {
        const delRef = doc(db, 'fire', id)
        try {
            await deleteDoc(delRef)
        } catch (err) {
            alert(err)
            console.log(err)
        }
    }
    return (
        <>
            <div className='form-container'>
                <h2>Add/Update Form</h2>
                <div className='box'>
                    <input
                        type='text'
                        placeholder='Your name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='box'>
                    <input
                        type='email'
                        placeholder='Your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='box'>
                    <input
                        type='password'
                        placeholder='Your password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button onClick={add}>Add</button>
                <button onClick={update}>Update</button>
            </div>

            <div className='database'>
                <h2>CRUD Database</h2>
                <div className='container'>
                    {fetchData.map((data) => (
                        <div className='box' key={data.id}>
                            <h3>Name: {data.Name}</h3>
                            <h3>Email: {data.Email}</h3>
                            <h3>Password: {data.Password}</h3>
                            <button onClick={() => passData(data.id)}>Update</button>
                            <button onClick={() => del(data.id)}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Crud;
