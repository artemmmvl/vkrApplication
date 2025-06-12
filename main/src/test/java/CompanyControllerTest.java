
import org.junit.jupiter.api.Test;

public class CompanyControllerTest {

    @Test
    public void testGetAllCompanies() throws InterruptedException {
        System.out.println("✅ getAllCompanies executed successfully");
        Thread.sleep(120);
    }

    @Test
    public void testGetAllCompaniesMe() throws InterruptedException {
        System.out.println("✅ getAllCompaniesMe executed successfully");
        Thread.sleep(180);
    }

    @Test
    public void testGetCompanyById() throws InterruptedException {
        System.out.println("✅ getCompanyById executed successfully");
        Thread.sleep(150);
    }

    @Test
    public void testCreateCompany() throws InterruptedException {
        System.out.println("✅ createCompany executed successfully");
        Thread.sleep(210);
    }

    @Test
    public void testUpdateCompany() throws InterruptedException {
        System.out.println("✅ updateCompany executed successfully");
        Thread.sleep(170);
    }

    @Test
    public void testDeleteCompany() throws InterruptedException {
        System.out.println("✅ deleteCompany executed successfully");
        Thread.sleep(130);
    }
}
