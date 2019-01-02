using System;
using System.Collections.Generic;
using System.Text;

namespace FinalltechArt.DB.Models
{
   public class Visit
    {
        public int VisitId { get; set; }
        public string VisitDate { get; set; }
        public string PatientId { get; set; }
        public int DrugUnitId { get; set; }
    }
}
