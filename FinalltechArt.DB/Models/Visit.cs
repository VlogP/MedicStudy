using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinalltechArt.DB.Models
{
   public class Visit
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int VisitId { get; set; }
        [Required(ErrorMessage = "Doesn't set the birthdate")]
        [RegularExpression(@"([0-2]\d|3[01])\.(0\d|1[012])\.(\d{4})", ErrorMessage = "Wrong date view")]
        public string VisitDate { get; set; }
        [Required(ErrorMessage = "Doesn't set the patient id")]
        public string PatientId { get; set; }
        [Required(ErrorMessage = "Doesn't set the drug id")]
        public int DrugUnitId { get; set; }
    }
}
