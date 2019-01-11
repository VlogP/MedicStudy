using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;


namespace FinalltechArt.DB.Models
{
   public class Clinic
    {
        [Key]
        public string ClinicId { get; set; }
        [Required(ErrorMessage = "Doesn't set the name")]
        public string Name { get; set; }
    }
}
