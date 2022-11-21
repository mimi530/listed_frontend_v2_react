import React, { useContext, useEffect, useState } from 'react'
import { FaPen, FaTrash, FaUserAlt, FaUserPlus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../../api';
import { AuthContext } from '../../context/AuthContext';
import i18n from '../../i18n';
import { routes } from '../../routes';
import { Input } from '../Input';
import { Modal } from '../Modal';


export const ListsShowHeader = ({list, getList}) => {

  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [isUserModalVisible, setIsUserModalVisible] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)

  useEffect(() => {
    setName(list.name)
  }, [])

  const handleDelete = () => {
    api.delete(`lists/${list.id}`).then(
        response => {
            if(response.status === 200) {
                toast.success(response.data.message)
                navigate(routes.lists);
            }
        }
    ).catch(
        error => {
            toast.error(error.response.data.message)
        }
    )
  }

  const handleEdit = (e) => {
    e.preventDefault();
    api.patch(`lists/${list.id}`, {name}).then(
        response => {
            if(response.status === 200) {
                toast.success(response.data.message)
                setIsEditModalVisible(false)
                getList()
            }
        }
    ).catch(
        error => {
            toast.error(error.response.data.message)
        }
    )
  }

  const handleAddUser = (e) => {
    e.preventDefault();
    api.patch(`lists/${list.id}`, {email}).then(
        response => {
            if(response.status === 200) {
                toast.success(response.data.message)
                setIsUserModalVisible(false);
                getList();
            }
        }
    ).catch(
        error => {
            toast.error(error.response.data.message)
        }
    )
  }

  return (
    <>
    <div className="flex flex-col md:flex-row items-center justify-between">
      <div className="w-full">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-primary sm:truncate sm:text-3xl sm:tracking-tight">
            <Link to={routes.lists}>
              {list && list.name}
            </Link>
          </h2>
          <div className="mt-1 ml-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-200 gap-1">
              <FaUserAlt/>
              {list && list.users.map(
                user => {
                  return user.name === authContext.username ? i18n.t('You') : user.name
                }).reduce((prev, curr) => [prev, ', ', curr])
              }
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 w-full justify-start md:justify-end">
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          <span className="sm:ml-3">
            <button type="button" className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-xl font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" onClick={() => setIsUserModalVisible(true)}>
              <FaUserPlus/>
            </button>
          </span>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          <span className="sm:ml-3">
            <button type="button" className="inline-flex gap-2 items-center rounded-md border border-transparent bg-yellow-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2" onClick={() => setIsEditModalVisible(true)}>
              <FaPen/>
              {i18n.t('Edit')}
            </button>
          </span>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          <span className="sm:ml-3">
            <button type="button" className="inline-flex gap-2 items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" onClick={() => setIsDeleteModalVisible(true)}>
              <FaTrash/>
              {i18n.t('Delete')}
            </button>
          </span>
        </div>
      </div>
    </div>
    <Modal Icon={<FaPen/>} iconColor="bg-yellow-200  dark:bg-yellow-400" setIsVisible={setIsEditModalVisible} isVisible={isEditModalVisible} title={i18n.t("List name")}
      content={() => {
        return (
          <Input type="text" onChange={e => setName(e.target.value)} id="name" name="name" value={name}/>
        )
      }}
      buttons={() => {
        return (
          <>
          <button type="button" className="inline-flex w-full justify-center rounded-md border border-transparent bg-yellow-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleEdit}>
            {i18n.t('Update')}
          </button>
          <button type="button" className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setIsEditModalVisible(false)}>
            {i18n.t('Cancel')}
          </button>
          </>
        )
      }}
    />
    <Modal Icon={<FaUserPlus/>} iconColor="bg-blue-200 dark:bg-blue-400" setIsVisible={setIsUserModalVisible} isVisible={isUserModalVisible} title={i18n.t("Adding user to the list")}
      content={() => {
        return (
          <Input type="text" onChange={e => setEmail(e.target.value)} id="name" name="name" value={email} placeholder={i18n.t('User email')}/>
        )
      }}
      buttons={() => {
        return (
          <>
          <button type="button" className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleAddUser}>
            {i18n.t('Add')}
          </button>
          <button type="button" className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setIsUserModalVisible(false)}>
            {i18n.t('Cancel')}
          </button>
          </>
        )
      }}
    />
    <Modal Icon={<FaTrash/>} iconColor="bg-red-200 dark:bg-red-400" setIsVisible={setIsDeleteModalVisible} isVisible={isDeleteModalVisible} title={i18n.t("Are you sure?")}
      content={() => {
        return i18n.t('Are you sure you want to delete this list? This action cannot be undone.');
      }}
      buttons={() => {
        return (
          <>
          <button type="button" className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleDelete}>
            {i18n.t('Delete')}
          </button>
          <button type="button" className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setIsDeleteModalVisible(false)}>
            {i18n.t('Cancel')}
          </button>
          </>
        )
      }}
    />
    </>
  )
}
