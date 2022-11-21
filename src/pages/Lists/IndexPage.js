import React, { useEffect, useState } from 'react'
import {FaClipboardList} from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {api} from '../../api';
import { AddForm } from '../../components/AddForm';
import { AuthBackground } from '../../components/Layout/AuthBackground';
import { routes } from '../../routes';

export const ListsIndexPage = () => {

  const [lists, setLists] = useState([]);
  const [name, setName] = useState('');

  const getLists = async () => {
    await api.get('lists').then(
        response => {
            setLists(response.data)
        }
    ).catch(
        error => {
            toast.error(error.response.data.message)
        }
    )
  }

  const handleAddList = (e) => {
    e.preventDefault();
    api.post(`lists`, {name}).then(
      response => {
        if(response.status === 201)
          getLists();
          setName('')
      }
    ).catch(
        error => {
            toast.error(error.response.data.message)
        }
    );
  }
  
  useEffect(() => {
    getLists();
  }, [])

  return (
    <AuthBackground>
      <div className="py-10 overflow-y-auto">
      <AddForm handleSubmit={handleAddList} placeholder="Add new list" value={name} setValue={e => setName(e.target.value)}/>
        <ul className="py-24 px-3">
          {lists.map(list => {
            return (
              <Link to={`${routes.list_items + list.id}`} key={list.id}>
                <li className="sm:pb-4 rounded-lg border-primary border-2 mb-3 w-full">
                  <div className="flex items-center justify-between space-x-4 p-4">
                    <div className="flex-shrink-0">
                        <FaClipboardList className="text-4xl text-primary"/>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-accent truncate dark:text-white">
                          {list.name}
                        </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {list.items_count ? (
                          (list.items_bought_count ?? '0') + ' / ' + list.items_count
                        ) : null
                      }
                    </div>
                  </div>
                </li>
              </Link>
            )
          })}
        </ul>  
      </div>
    </AuthBackground>
  )
}