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
        public string DrugType { get; set; }
        [Required(ErrorMessage = "Doesn't set the name")]
        [RegularExpression(@"^[a-zA-Z]{3,}$", ErrorMessage = "Wrong name view")]
        public string TypeCapacity { get; set; }
        [Required(ErrorMessage = "Doesn't set the name")]
        [RegularExpression(@"^[a-zA-Z]{3,}$", ErrorMessage = "Wrong manufaturer view ")]
        public string Capacity { get; set; }
        [Required(ErrorMessage = "Doesn't set the description")]       
        public string Name { get; set; }
        [Required(ErrorMessage = "Doesn't set the description")]
        public string Manufacturer { get; set; }
        [Required(ErrorMessage = "Doesn't set the description")]
        public string Description { get; set; }
        public string ClinicId { get; set; }

        public int Count { get; set; }

        public int? VisitId { get; set; }
        public Visit Visit { get; set; }

    }
}
