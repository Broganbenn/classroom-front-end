import { useEffect, useState } from 'react';
import { getComplaints } from '../helpers/apiEndpoints';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';


const ComplaintList = () => {
  const dummyCompaints = [
    {
      "id": "1",
      "message": "This is a dummy complaint",
    },
    {
      "id": "2",
      "message": "This is another dummy complaint",
    }
  ]
  const [complaints, setComplaints] = useState(dummyCompaints)

  useEffect(() => {
    const fetchComplaints = async () => {
      const { apiEndpoint, apiOptions } = await getComplaints()
      console.log("apiEndpoint", apiEndpoint)
      const response = await fetch(apiEndpoint, apiOptions)
      console.log("response", response)
      const data = await response.json()
      console.log(data)
      setComplaints(data)
    }
    fetchComplaints()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  //Create 
  // const handleSubmit = async (event) => {
  //   event.preventDefault()
  //   const complaint = {
  //     message: event.target.message.value,
  //     source: "james-front-end",
  //     submitter: event.target.submitter.value,
  //     type: event.target.type.value,
  //   }
  //   console.log("complaint", complaint)
  //   const { apiEndpoint, apiOptions } = await createComplaint(complaint)
  //   console.log("apiEndpoint", apiEndpoint)
  //   const response = await fetch(apiEndpoint, apiOptions)
  //   console.log("response", response)
  //   const data = await response.json()
  //   console.log(data)
  //   setComplaints([...complaints, data])
  // }

  const CoolTable = ({ data }) => {
    // const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

    const result = data.filter((item) => item.record_type === "complaint")

    return (
      <table>
        <tbody>
          {result.map((complaint) => (
            <Card key={complaint.id} sx={{
              width: 1400, color: '#1e2021', marginBlock: "12px", backgroundColor: "#dae0eb", boxShadow: "1px 3px 3px #87898c", border: "1px solid #1e2021", cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#bec3cc', transform: 'scale(1.01)',
              }
            }}>
              <CardContent sx={{ flex: "1.0 auto" }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexGrow: 1 }}>
                    <Typography variant='h5' sx={{ textAlign: 'left', flexBasis: '50%', }} >{complaint.message}</Typography>
                    <Typography sx={{ flexBasis: '15%' }}>{complaint.name}</Typography>
                    <Typography sx={{ flexBasis: '15%' }}>{complaint.source}</Typography>
                    <Typography variant='h5' sx={{ flexBasis: '20%', textAlign: 'right' }}>{complaint.type}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexGrow: 1 }}>
                  <Typography sx={{ flexBasis: '10%' }}>{new Date(complaint.created_at).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' })}</Typography>
                  <Typography sx={{ flexBasis: '20%' }}>{complaint.email}</Typography>
                  <Typography sx={{ flexBasis: '20%' }}>{complaint.phone}</Typography>
                </Box>


              </CardContent>
            </Card>
          ))}
        </tbody>
      </table>
    )
  }



  return (






    <div>

      <h1>Complaints</h1>
      <CoolTable data={complaints} />

    </div>


  )
}

export default ComplaintList