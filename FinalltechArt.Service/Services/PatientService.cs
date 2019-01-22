using System;
using System.Collections.Generic;
using System.Text;
using DataTransferObject;
using FinalltechArt.DB.Models;
using FinalltechArt.DB.DBRepository;
using FinalltechArt.Service.Interfaces;
namespace FinalltechArt.Service.Services
{
   public class PatientService:IPatientService
    {
        UserRepository UserRep;
        PatientRepository PatientRep;
        public PatientService(RepositoryContext context) { UserRep = new UserRepository(context); PatientRep = new PatientRepository(context); }
       public IEnumerable<PatientTableViewDTO> GetAllSponsorPatients()
        {
           return PatientRep.GetAllSponsor();
        }
       public IEnumerable<PatientTableViewDTO> GetAllResearcherPatients(int IdResearcher)
        {
            string ClinicId = UserRep.FindUserById(IdResearcher).ClinicId;
            return PatientRep.GetAllResearcher(ClinicId);
        }


    }
}
