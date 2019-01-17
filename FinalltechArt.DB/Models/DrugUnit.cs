using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinalltechArt.DB.Models
{
    public class DrugUnit
    {
        [Key]
        public int DrugUnitId { get; set; }
        [Required(ErrorMessage = "Doesn't set the type of drug")]
        public int DrugType { get; set; }
        [Required(ErrorMessage = "Doesn't set the name")]
        [RegularExpression(@"^[a-zA-Z]{3,}$", ErrorMessage = "Wrong name view")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Doesn't set the name")]
        [RegularExpression(@"^[a-zA-Z]{3,}$", ErrorMessage = "Wrong manufaturer view ")]
        public string Manufacturer { get; set; }
        [Required(ErrorMessage = "Doesn't set the description")]
        [StringLength(255, MinimumLength = 10, ErrorMessage = "Too small description")]
        public string Description { get; set; }
        [Required(ErrorMessage = "Doesn't set the clinic id ")]
        public string ClinicId { get; set; }

    }
}
