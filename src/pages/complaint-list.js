import { useEffect, useState } from 'react';
import { getComplaints} from '../helpers/apiEndpoints';
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
    
    const CoolTable = ({data}) => {
      // const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
    
      const result = data.filter((item) => item.record_type === "complaint")
    
      return (
        <table>
            <tbody>
              {result.map((complaint) => (
                  <Card key={complaint.id} sx={{ width: 1400, color: '#1e2021', marginBlock: "12px", backgroundColor: "#dae0eb", boxShadow: "1px 3px 3px #87898c", border: "1px solid #1e2021", cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#bec3cc', transform: 'scale(1.01)',
                  }  }}>
                    <CardContent sx={{flex: "1.0 auto"}}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', textAlign: 'left', flexDirection: 'row', flexGrow: 1, }}>
                    <Typography variant='h6' component={"div"} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', flexGrow: 1, }}>
  <Typography sx={{textAlign: 'left'}} >{complaint.message}</Typography>
  <Typography>{complaint.submitter}</Typography>
  <div className='wall'></div>
  <Typography>{complaint.source}</Typography>
  </Typography>
  </Box>
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left', flexDirection: 'row', flexGrow: 1, }}>
  <Typography>{complaint.type}</Typography>
  <div className='wall'></div>
  <Typography >{new Date(complaint.created_at).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' })}</Typography>
  <div className='wall'></div>
  <Typography >{complaint.email}</Typography>
  <div className='wall'></div>
  <Typography>{complaint.phone}</Typography>
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