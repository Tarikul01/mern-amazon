

const getError = (error) => {
  return error.response && error.response.data.mesage?error.response.data.message:error.message;
  
}

export default getError;
