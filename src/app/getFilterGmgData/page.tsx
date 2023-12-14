const BaseUrl = 'https://gjbq17jks3.execute-api.us-east-1.amazonaws.com/dev';

interface FormValue {
  MediaType: string;
  City: string;
  // Add other properties as needed based on the actual structure of your form value
}

export async function getFilterGmgData(formvalue: FormValue) {
  console.log(formvalue);
  return fetch(`${BaseUrl}/getAllFilterGmg`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formvalue),
  });
}
