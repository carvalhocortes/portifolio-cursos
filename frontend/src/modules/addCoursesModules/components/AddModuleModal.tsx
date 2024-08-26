import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage
} from '@chakra-ui/react'
import { ModuleFormData } from '../validators'

interface AddModuleModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ModuleFormData) => void
  errors: any
  register: any
  handleSubmit: any
}

export const AddModuleModal: React.FC<AddModuleModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  errors,
  register,
  handleSubmit
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Criar Novo Módulo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mb={4} isInvalid={!!errors.name}>
              <FormLabel>Nome do Módulo</FormLabel>
              <Input {...register('name')} />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>
            <FormControl mb={4} isInvalid={!!errors.videoName}>
              <FormLabel>Nome do Vídeo</FormLabel>
              <Input {...register('videoName')} />
              <FormErrorMessage>{errors.videoName?.message}</FormErrorMessage>
            </FormControl>
            <FormControl mb={4} isInvalid={!!errors.videoDuration}>
              <FormLabel>Duração do Vídeo (minutos)</FormLabel>
              <Input type="number" {...register('videoDuration')} />
              <FormErrorMessage>{errors.videoDuration?.message}</FormErrorMessage>
            </FormControl>
            <FormControl mb={4} isInvalid={!!errors.videoUrl}>
              <FormLabel>URL do Vídeo</FormLabel>
              <Input {...register('videoUrl')} />
              <FormErrorMessage>{errors.videoUrl?.message}</FormErrorMessage>
            </FormControl>
            <ModalFooter>
              <Button
                color="white"
                backgroundColor="#DF3068"
                mb="4"
                borderWidth="1px"
                _hover={{
                  borderColor: '#DF3068',
                  color: '#DF3068',
                  backgroundColor: 'transparent'
                }}
                onClick={onClose}
              >
                Cancelar
              </Button>
              <Button
                ml={3}
                type="submit"
                color="white"
                backgroundColor="form.primary-button"
                mb="4"
                borderWidth="1px"
                _hover={{
                  borderColor: 'form.primary-button',
                  color: 'form.primary-button',
                  backgroundColor: 'transparent'
                }}
              >
                Adicionar Módulo
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
