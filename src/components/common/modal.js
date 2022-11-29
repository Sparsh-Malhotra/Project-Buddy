import { useState } from 'react'
import { Dialog } from '@headlessui/react'

export function ModalComponent(props) {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Dialog open={props.show} onClose={closeModal}>
      <Dialog.Panel>
        <Dialog.Title>Error</Dialog.Title>
        <Dialog.Description>
            {props.errorMsg}
        </Dialog.Description>

        <button onClick={closeModal}>Close</button>

      </Dialog.Panel>
    </Dialog>
  )
}