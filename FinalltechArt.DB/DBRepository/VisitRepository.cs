using System;
using System.Collections.Generic;
using System.Text;
using FinalltechArt.DB.Interfaces;
using FinalltechArt.DB.DBRepository;
using FinalltechArt.DB.Models;

namespace FinalltechArt.DB.DBRepository
{
    public class VisitRepository:BaseRepository<Visit>,IVisitRepository
    {
        public VisitRepository(RepositoryContext context) : base(context) { }

    }
}
