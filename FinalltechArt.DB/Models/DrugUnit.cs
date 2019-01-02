using System;
using System.Collections.Generic;
using System.Text;

namespace FinalltechArt.DB.Models
{
    public class DrugUnit
    {
        public int DrugUnitId { get; set; }
        public int DrugType { get; set; }
        public string Name { get; set; }
        public string Manufacturer { get; set; }
        public string Description { get; set; }
        public string ClinicId { get; set; }

    }
}
