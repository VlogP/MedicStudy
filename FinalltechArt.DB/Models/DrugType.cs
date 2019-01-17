using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace FinalltechArt.DB.Models
{
   public class DrugType
    {
        [Key]
        public int DrugTypeId { get; set; }
        public string Value { get; set; }
    }
}
