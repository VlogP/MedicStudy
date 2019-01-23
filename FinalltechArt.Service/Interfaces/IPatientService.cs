using System;
using System.Collections.Generic;
using System.Text;
using DataTransferObject;
using FinalltechArt.DB.Models;

namespace FinalltechArt.Service.Interfaces
{
   public interface IPatientService
    {
        IEnumerable<PatientTableViewDTO> GetAllSponsorPatients();
        IEnumerable<PatientTableViewDTO> GetAllResearcherPatients(int IdResearcher);
        bool AddPatient(Patient patient, int ResearcherId);
        PatientDTO GetFullInfoOne(string Id);
        bool RegisterNewVisit(string Id,int ResearcherId);
    }
}
