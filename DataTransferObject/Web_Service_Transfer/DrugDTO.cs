using System;
using System.Collections.Generic;
using System.Text;

namespace DataTransferObject
{
   public class DrugDTO
    {
        public string DrugUnitId { get; set; }
       
        public string DrugType { get; set; }
        
        public string TypeCapacity { get; set; }
       
        public string Capacity { get; set; }

        public string Name { get; set; }

        public string Manufacturer { get; set; }

        public string Description { get; set; }

        public int Sort { get; set; }

    }
}
