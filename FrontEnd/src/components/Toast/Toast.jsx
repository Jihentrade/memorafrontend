import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Snackbar } from '@mui/material';
import { setToasts } from '../../redux/toasts.slice';

const Toast = () => {
  const dispatch = useDispatch();
  const { toasts } = useSelector((state) => state.toasts);
  const handleChange = setToasts((elems) => dispatch(setToasts(elems)))
  const [open, setOpen] = React.useState(false)
  const [messageInfo, setMessageInfo] = React.useState(undefined)

  React.useEffect(() => {
    if (toasts.length && !messageInfo) {
      setMessageInfo({ ...toasts[0] })
      dispatch(setToasts(toasts.slice(1)))
      setOpen(true)
    } else if (toasts.length && messageInfo && open) {
      setOpen(false)
    }
  }, [toasts, messageInfo, open])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const handleExited = () => {
    setMessageInfo(undefined)
  }

  return (
    <Snackbar
      key={messageInfo ? messageInfo.key : undefined}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      TransitionProps={{ onExited: handleExited }}
    >
      <Alert
        variant='filled'
        onClose={handleClose}
        severity={messageInfo ? messageInfo.severity : 'info'}
      >
        {messageInfo ? messageInfo.message : undefined}
      </Alert>
    </Snackbar>
  )
}

Toast.defaultProps = {
  variant: 'filled',
}

export default Toast
