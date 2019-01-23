using System;
using System.Collections.Generic;
using System.Text;

namespace DataTransferObject
{
   public class PatientTableViewDTO
    {
       
        public string PatientId { get; set; }          
        public string ClinicId { get; set; }    
        public string BirthDate { get; set; }      
        public string VisitLast { get; set; }
        public string UsedDrugs { get; set; }
       
       

    }
}
