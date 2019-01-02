using System;
using System.Collections.Generic;
using System.Text;

namespace FinalltechArt.DB.Models
{
   public class Patient
    {
        public string PatientId { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string ClinicId { get; set; }
        public string BirthDate { get; set; }
        public int Gender { get; set; }
        public int Status { get; set; }
        public int DrugType { get; set; }
    }
}
