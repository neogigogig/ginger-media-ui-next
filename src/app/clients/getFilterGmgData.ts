const BaseUrl = 'https://gjbq17jks3.execute-api.us-east-1.amazonaws.com/dev';

interface FormValue {
  MediaType: string;
  City: string;
}

export async function getFilterGmgData(formvalue: FormValue) {
  return fetch(`${BaseUrl}/getAllFilterGmg`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formvalue),
  });
}
