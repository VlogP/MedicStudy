using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
namespace FinalltechArt.DB.Models
{
    public class Status
    {
        [Key]
        public int StatusId { get; set; }
        public string Value { get; set; }
    }
}
