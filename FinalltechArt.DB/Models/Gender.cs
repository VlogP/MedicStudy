﻿using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
namespace FinalltechArt.DB.Models
{
    public class Gender
    {
        [Key]
        public int GenderId { get; set; }
        public string Value { get; set; }
    }
}
