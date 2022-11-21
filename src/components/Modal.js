import React from 'react'

export const Modal = ({title, content, buttons, isVisible, Icon, iconColor, setIsVisible}) => {
  return (
    isVisible && <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full z-20 items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white p-8 sm:p-6 sm:pb-4 dark:bg-secondary">
              <div className="sm:flex sm:items-start">
                {Icon && 
                  <div className={"mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10 dark:text-white " + iconColor}>
                    {Icon}
                  </div>
                }
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg font-medium leading-6 text-accent dark:text-white " id="modal-title">{title}</h3>
                  <div className="mt-2">
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      {content && content()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-secondary px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 flex gap-3">
              {buttons && buttons()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
