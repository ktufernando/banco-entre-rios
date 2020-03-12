export const getData =  async () => {
    const res = await axios.get('../../dataMock.js');
    const data = res.data;
    return data;
}