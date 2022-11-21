import React, { useContext, useEffect, useState } from 'react'
import { FaRegCheckSquare, FaRegSquare } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { api } from '../../api';
import { AddForm } from '../../components/AddForm';
import { Calculator } from '../../components/Calculator';
import { AuthBackground } from '../../components/Layout/AuthBackground';
import { ListsShowHeader } from '../../components/Lists/ListsShowHeader';
import { AuthContext } from '../../context/AuthContext';

export const ListsShowPage = () => {
  const [list, setList] = useState()
  const [items, setItems] = useState([])
  const [name, setName] = useState('')
  const {listId} = useParams();
  const authContext = useContext(AuthContext);

  const getList = async () => {
    api.get(`/lists/${listId}`)
    .then(
      response => {
        setItems(response.data.items)
        setList(response.data.list)
      }
    ).catch(
      error => {
        toast.error(error.response.data.message)
      }
    )
  }

  const handleBought = async (item) => {
    const data = {
      bought: !item.bought
    };
    await api.patch('lists/'+list.id+'/items/'+item.id, data)
    .then(
      response => {
        if(response.status === 200)
          getList()
      }
    ).catch(error => {
      console.log(error)
    })
  }

  const handleAddItem = (e) => {
    e.preventDefault();
    const item = {
        name: name,
        user: {
            name: authContext.username
        }
    }
    setName('')
    e.target[0].focus();
    api.post(`lists/${list.id}/items`, item).then(
      response => {
        if(response.status === 201)
          getList();
      }
    ).catch(
        error => {
            toast.error(error.response.data.message)
        }
    );
  }

  useEffect(() => {
    getList();
  }, [])

  return (
    <>
    <AuthBackground>
      <div className="h-full w-full py-10 px-3 overflow-y-auto">
        {list && <ListsShowHeader list={list} getList={getList}/>}
        <AddForm handleSubmit={handleAddItem} placeholder="Add new item" value={name} setValue={e => setName(e.target.value)}/>
        <Calculator/>
        <ul className="py-12">
          {items.map(item => {
            return (
              <div className={"sm:pb-4 rounded-lg shadow-md border-primary border-2 mb-3 py-4 px-3 w-full flex justify-between items-center " + (item.bought ? 'bg-primarydark' : 'bg-primary')}>
                <Link to={`/lists/${list.id}/items/${item.id}`}>
                  <div className="flex flex-col">
                    <div className="font-medium text-sm text-gray-800">
                      @{item.user.name}
                    </div>
                    <div className="">
                        <p className={"text-2xl font-medium truncate text-white " + (item.bought ? 'line-through' : '')}>
                          {item.name}
                        </p>
                        <p className="text-md mt-1 truncate dark:text-white text-gray-200">
                          {item.description}
                        </p>
                    </div>
                  </div>
                </Link>
                <div>
                  <div className="inline-flex items-center font-semibold text-white text-5xl" onClick={() => handleBought(item)}>
                    {item.bought ? (
                      <FaRegCheckSquare/>
                    ) : (
                      <FaRegSquare/>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </ul>
      </div>
    </AuthBackground>
    </>
  )
}
