using System;
using System.Collections.Generic;
using System.Text;
using FinalltechArt.DB.Interfaces;
using FinalltechArt.DB.Models;
namespace FinalltechArt.DB.DBRepository
{
    public class ClinicRepository:BaseRepository<Clinic>,IClinicRepository
    {
        public ClinicRepository(RepositoryContext context) : base(context) { }
    }
}
