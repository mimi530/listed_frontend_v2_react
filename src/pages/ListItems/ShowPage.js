import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaPen, FaTrash } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { api } from '../../api';
import { Input } from '../../components/Input';
import { AuthBackground } from '../../components/Layout/AuthBackground';
import { Modal } from '../../components/Modal';
import i18n from '../../i18n';

export const ListItemShowPage = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const {listId, itemId} = useParams();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const navigate = useNavigate();

  const handleDeleteItem = async (item) => {
    api.delete(`lists/${listId}/items/${itemId}`).then(
        response => {
            if(response.status === 200) {
                toast.success(response.data.message)
                return navigate(`/lists/${listId}`);
            }
        }
    ).catch(
        error => {
            toast.error(error.response.data.message)
        }
    )
  }

  const getItem = async () => {
    await api.get(`/lists/${listId}/items/${itemId}`)
    .then(
      response => {
        setName(response.data.item.name)
        setDescription(response.data.item.description)
      }
    ).catch(
      error => {
        toast.error(error.response.data.message)
      }
    )
  }

  useEffect(() => {
    getItem();
  }, [])

  const handleEditItem = (e) => {
    e.preventDefault();
    const item = {
        name: name,
        description: description
    }
    api.patch(`lists/${listId}/items/${itemId}`, item).then(
      response => {
        if(response.status === 200)
          return navigate(`/lists/${listId}`)
      }
    ).catch(
        error => {
            toast.error(error.response.data.message)
        }
    );
  }

  return (
    <>
    <AuthBackground>
      <div className="h-full w-full py-10 overflow-y-auto mt-36">
        <div className="flex flex-col md:flex-row items-center justify-between px-5">
        <div className="w-full flex-col">
          <div className="min-w-0 flex-1">
              <Input type="text" onChange={e => setName(e.target.value)} id="name" name="name" value={name} placeholder={i18n.t('Item name')}/>
              <Input type="text" onChange={e => setDescription(e.target.value)} id="description" name="description" value={description} placeholder={i18n.t('Item description')}/>
          </div>
        </div>
        <div className="flex flex-col w-full gap-5">
          <div className="flex flex-row gap-3 w-full justify-start md:justify-end">
              <div className="mt-5 flex lg:mt-0 lg:ml-4 w-1/2">
                  <span className="sm:ml-3 w-full">
                      <button type="button" className="w-full justify-center inline-flex gap-2 items-center rounded-md border border-transparent bg-yellow-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2" onClick={handleEditItem}>
                      <FaPen/>
                      {i18n.t('Save')}
                      </button>
                  </span>
              </div>
              <div className="mt-5 flex lg:mt-0 lg:ml-4 w-1/2">
                <span className="sm:ml-3 w-full">
                  <button type="button" className="w-full justify-center inline-flex gap-2 items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" onClick={() => setIsDeleteModalVisible(true)}>
                  <FaTrash/>
                  {i18n.t('Delete item')}
                  </button>
                </span>
              </div>
          </div>
          <button type="button" className="w-full justify-center inline-flex gap-2 items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium  shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-gray-50 border-gray-300 bg-white text-gray-700 " onClick={() => navigate(`/lists/${listId}`)}>
            <FaArrowLeft/>
            {i18n.t('Back')}
          </button>
        </div>
        </div>
      </div>
      <Modal Icon={<FaTrash/>} iconColor="red-200" setIsVisible={setIsDeleteModalVisible} isVisible={isDeleteModalVisible} title={i18n.t("Are you sure?")}
        content={() => {
            return i18n.t('Are you sure you want to delete this list? This action cannot be undone.');
        }}
        buttons={() => {
            return (
            <>
            <button type="button" className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleDeleteItem}>
                {i18n.t('Delete')}
            </button>
            <button type="button" className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setIsDeleteModalVisible(false)}>
                {i18n.t('Cancel')}
            </button>
            </>
            )
        }}
        />
    </AuthBackground>
    </>
  )
}