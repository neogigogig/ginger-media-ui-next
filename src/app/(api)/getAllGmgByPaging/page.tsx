const BaseUrl = 'https://gjbq17jks3.execute-api.us-east-1.amazonaws.com/dev';



export default async function getAllGmgByPaging(currentPage:number,pageSize:number) {
  console.log(currentPage,pageSize)
  return fetch(`${BaseUrl}/getAllGmgByPaging?page=${currentPage}&pageSize=${pageSize}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
   
  });
}



