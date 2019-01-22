using System;
using System.Collections.Generic;
using System.Text;
using DataTransferObject;


namespace FinalltechArt.Service.Interfaces
{
   public interface IPatientService
    {
        IEnumerable<PatientTableViewDTO> GetAllSponsorPatients();
        IEnumerable<PatientTableViewDTO> GetAllResearcherPatients(int IdResearcher);
    }
}
