using System;
using System.Collections.Generic;
using System.Text;

namespace DataTransferObject
{
    public class PatientDTO
    {
                   
        public string Firstname { get; set; }
       
        public string Lastname { get; set; }
        
        public string BirthDate { get; set; }
       
        public string Gender { get; set; }
       
        public string Status { get; set; }

        public int IllnesId { get; set; }
        public List<VisitDTOInfoViewOne> VisitDTO { get; set; }
    }
}
