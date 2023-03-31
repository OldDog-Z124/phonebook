const Notification = ({message, type}) => {
  
  if (!message) return null

  console.log(message)

  const style = {
    padding: '10px 20px',
    border: '2px solid green',
    color: 'green',
    fontSize: 20,
  }
  
  if (type === 'succeed') {
    style.color = 'green'
    style.borderColor = 'green'
  }
  else if (type === 'error') {
    style.color = 'red'
    style.borderColor = 'red'
  }

  return (
    <div style={style}>
      <p>{message}</p>
    </div>
  )
}

export default Notification