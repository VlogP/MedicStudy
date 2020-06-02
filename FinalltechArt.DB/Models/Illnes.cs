using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinalltechArt.DB.Models
{
    public class Illnes
    {
        [Key]
        public int Id { get; set; }

        public string Description { get; set; }
    }
}
