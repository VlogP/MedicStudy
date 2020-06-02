using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinalltechArt.DB.Models
{
    public class DrugAtClinics
    {
        [Key]
        public int Id { get; set; }

        public int DrugUnitId { get; set; }

        public string DrugUnitName { get; set; }

        public int ClinicId { get; set; }

        public int Count { get; set; }
    }
}
