using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinalltechArt.DB.Models
{
   public class Patient
    {
        [Key]
        public string PatientId { get; set; }
        [Required(ErrorMessage = "Doesn't set the first name")]
        [RegularExpression(@"^[a-zA-Z]{1,}$", ErrorMessage = "Wrong first name view")]
        public string Firstname { get; set; }
        [Required(ErrorMessage = "Doesn't set the second name")]
        [RegularExpression(@"^[a-zA-Z]{1,}$", ErrorMessage = "Wrong second name view")]
        public string Lastname { get; set; }
        [Required(ErrorMessage = "Doesn't set the clinic id")]
        public string ClinicId { get; set; }
        [Required(ErrorMessage = "Doesn't set the birthdate")]
        [RegularExpression(@"([0-2]\d|3[01])\.(0\d|1[012])\.(\d{4})", ErrorMessage = "Wrong birthdate view")]
        public string BirthDate { get; set; }
        [Required(ErrorMessage = "Doesn't set the gender")]
        public string Gender { get; set; }
        [Required(ErrorMessage = "Doesn't set the status")]
        public string Status { get; set; }
        
        public List<Visit> Visits { get; set; }
    }
}
