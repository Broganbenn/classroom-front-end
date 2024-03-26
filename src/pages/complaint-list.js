import { useEffect, useState } from 'react';
import { getComplaints} from '../helpers/apiEndpoints';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { green } from '@mui/material/colors';
import { Scale } from '@mui/icons-material';

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
                  <Card key={complaint.id} sx={{ maxWidth: 255, color: '#1e2021', marginBlock: "12px", backgroundColor: "#dae0eb", boxShadow: "1px 3px 3px #87898c", border: "1px solid #1e2021", cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#bec3cc', transform: 'scale(1.05)',
                  }  }}>
                    <CardContent>
                    <Typography variant='h6' component={"div"}>
                      {complaint.message}
                    </Typography>
                    <Typography variant='body2'>
                      {complaint.submitter}
                    </Typography>
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