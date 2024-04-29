import { useEffect, useState } from 'react';
import { getComplaints } from '../helpers/apiEndpoints';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import DeleteIcon from '@mui/icons-material/Delete';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import PetsIcon from '@mui/icons-material/Pets';
import SupportIcon from '@mui/icons-material/Support';
import WbIncandescentIcon from '@mui/icons-material/WbIncandescent';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { red, blue, orange, grey, yellow, purple, green } from '@mui/material/colors';

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
  const StatusIcon = ({ status }) => {
    switch (status) {
      case "fire":
        return <WhatshotIcon sx={{ color: red[800] }} />
      case "trash":
        return <DeleteIcon sx={{ color: grey[800] }} />
      case "noise":
        return <VolumeUpIcon sx={{ color: purple[800] }} />
      case "parking":
        return <LocalParkingIcon sx={{ color: blue[800] }} />
      case "pet":
        return <PetsIcon />
      case "safety":
        return <SupportIcon sx={{ color: orange[800] }} />
      case "night":
        return <WbIncandescentIcon sx={{ color: green[800] }} />
      case "hazard":
        return <WarningAmberIcon sx={{ color: yellow[800] }} />
      default:
        return <SentimentVeryDissatisfiedIcon />
    }
  }

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
                  <Typography sx={{ flexBasis: '20%', textAlign: 'left' }}>Name: {complaint.name}</Typography>
                  <Typography sx={{ flexBasis: '10%' }}>{complaint.source}</Typography>
                  <Typography variant='h5' sx={{ flexBasis: '20%', textAlign: 'right', }}>{typeof complaint.type === 'string' ? complaint.type.charAt(0).toUpperCase() + complaint.type.slice(1).toLowerCase() : complaint.type}
                    <StatusIcon status={complaint.type} />
                  </Typography>

                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexGrow: 1 }}>
                  <Typography sx={{ flexBasis: '25%' }}>Submit Date: {new Date(complaint.created_at).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' })}</Typography>
                  <Typography sx={{ flexBasis: '25%' }}>Email: {complaint.email}</Typography>
                  <Typography sx={{ flexBasis: '25%', textAlign: 'left' }}>Phone Number: {complaint.phone}</Typography>
                  <Typography sx={{ flexBasis: '25%' }}>Address: {complaint.address}</Typography>
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