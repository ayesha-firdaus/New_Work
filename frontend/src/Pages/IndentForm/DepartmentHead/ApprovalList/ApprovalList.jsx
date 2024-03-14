import { useState, useEffect } from 'react';
import Message from '../../../../Utils/Message/Message';
import { useNavigate } from 'react-router-dom';
export default function ApprovalList() {
  const [AllIndent, setAllIndent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const Navigate=useNavigate();

  useEffect(() => {

      async function getAllIndent() {
        try {
          setLoading(true);
          setMessage('');
          setError(false);

          const res = await fetch("/api/indent/view");
          const data = await res.json();

          if (data.status === 'fail' || data.status === 'error') {
            setLoading(false);
            setError(true);
            setMessage(data.message);
            return;
          }


          setAllIndent(data.allIndent);
          setLoading(false);
          setMessage(data.message);

          // Display the message for 5 seconds
          setTimeout(() => {
            setMessage('');
          }, 5000);
        } catch (err) {
          setLoading(false);
          setError(true);
          setMessage('An error occurred.');
        }
      }

      getAllIndent();
    
  }, []);

  const formatDateTime = (dateTimeString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    };

    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateTimeString));
  };

  const formatDate = (dateTimeString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    };

    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateTimeString));
  };

  const formatTime = (dateTimeString) => {
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };

    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateTimeString));
  };
  const handleView=()=>{

  }

  return (
    <div>
      {}
      {message.length > 0 && <div><Message message={message} type={error ? 'error' : 'success'} /></div>}
      {loading ? <p>Loading...</p> :AllIndent.length>0?
        <table>
          <thead>
            <th>Serial No.</th>
            <th>Indent Raised By</th>
            <th>Date</th>
            <th>Time</th>
            <th>View</th>
          </thead>
          <tbody>
            {AllIndent?.map((el, i) => {
              console.log(el)
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{el.indenterName}</td>
                  <td>{formatDate(el.updatedAt)}</td>
                  <td>{formatTime(el.updatedAt)}</td>
                  <td onClick={()=>{Navigate(`/indentapproval/${el._id}`)}}>View</td>
                </tr>)
            
            })}
          </tbody>
        </table>
      :<Message message="No indent found" type="sucess" />}
    </div>
  );
}
